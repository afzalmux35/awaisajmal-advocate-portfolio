import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'

const MONGO_URL = process.env.MONGO_URL
const DB_NAME = process.env.DB_NAME || 'awais_portfolio'

let cachedClient = null

async function getDb() {
  if (!cachedClient) {
    cachedClient = new MongoClient(MONGO_URL)
    await cachedClient.connect()
  }
  return cachedClient.db(DB_NAME)
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

function json(data, status = 200) {
  return NextResponse.json(data, { status, headers: corsHeaders })
}

export async function GET(request, { params }) {
  const path = params?.path || []
  const route = path.join('/')

  try {
    if (route === '' || route === 'health') {
      return json({ status: 'ok', service: 'awais-ajmal-portfolio', time: new Date().toISOString() })
    }

    if (route === 'contact') {
      const db = await getDb()
      const items = await db
        .collection('contact_messages')
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .limit(200)
        .toArray()
      return json({ success: true, count: items.length, items })
    }

    return json({ error: 'Not found' }, 404)
  } catch (err) {
    return json({ error: 'Server error', detail: String(err?.message || err) }, 500)
  }
}

export async function POST(request, { params }) {
  const path = params?.path || []
  const route = path.join('/')

  try {
    if (route === 'contact') {
      const body = await request.json().catch(() => ({}))
      const { name, phone, email, subject, message } = body || {}

      if (!name || !phone || !message) {
        return json({ success: false, error: 'Name, phone and message are required.' }, 400)
      }

      const doc = {
        id: uuidv4(),
        name: String(name).slice(0, 120),
        phone: String(phone).slice(0, 40),
        email: email ? String(email).slice(0, 160) : '',
        subject: subject ? String(subject).slice(0, 200) : 'General Inquiry',
        message: String(message).slice(0, 4000),
        createdAt: new Date().toISOString(),
        read: false,
      }

      const db = await getDb()
      await db.collection('contact_messages').insertOne({ ...doc })

      return json({ success: true, message: 'Your message has been received. We will contact you shortly.', id: doc.id })
    }

    return json({ error: 'Not found' }, 404)
  } catch (err) {
    return json({ error: 'Server error', detail: String(err?.message || err) }, 500)
  }
}
