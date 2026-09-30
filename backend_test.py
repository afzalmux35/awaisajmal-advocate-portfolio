#!/usr/bin/env python3
"""
Backend API Test Suite for Lawyer Portfolio Contact API
Tests all contact form endpoints and health checks
"""

import requests
import json
import sys
from datetime import datetime

# Load base URL from environment
BASE_URL = "https://awais-legal-premium.preview.emergentagent.com/api"

def print_test_header(test_name):
    print(f"\n{'='*80}")
    print(f"TEST: {test_name}")
    print(f"{'='*80}")

def print_result(passed, message):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {message}")
    return passed

def test_health_endpoints():
    """Test 1: GET /api/health and GET /api should return status ok"""
    print_test_header("Health Check Endpoints")
    
    all_passed = True
    
    # Test /api/health
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        print(f"\nGET /api/health")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "ok":
                all_passed &= print_result(True, "/api/health returns 200 with status: ok")
            else:
                all_passed &= print_result(False, f"/api/health missing 'status: ok', got: {data}")
        else:
            all_passed &= print_result(False, f"/api/health returned {response.status_code}, expected 200")
    except Exception as e:
        all_passed &= print_result(False, f"/api/health request failed: {str(e)}")
    
    # Test /api (root)
    try:
        response = requests.get(BASE_URL, timeout=10)
        print(f"\nGET /api")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("status") == "ok":
                all_passed &= print_result(True, "/api returns 200 with status: ok")
            else:
                all_passed &= print_result(False, f"/api missing 'status: ok', got: {data}")
        else:
            all_passed &= print_result(False, f"/api returned {response.status_code}, expected 200")
    except Exception as e:
        all_passed &= print_result(False, f"/api request failed: {str(e)}")
    
    return all_passed

def test_contact_submission_valid():
    """Test 2: POST /api/contact with valid data should return success and id"""
    print_test_header("Contact Form Submission - Valid Data")
    
    all_passed = True
    
    payload = {
        "name": "Ahmed Hassan",
        "phone": "+92 300 1234567",
        "email": "ahmed.hassan@example.com",
        "subject": "Property Dispute",
        "message": "I need legal help with a property matter. My neighbor has encroached on my land and I need representation in court."
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/contact",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"\nPOST /api/contact")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 200:
            all_passed &= print_result(True, "POST /api/contact returned 200")
            
            data = response.json()
            
            if data.get("success") == True:
                all_passed &= print_result(True, "Response has success: true")
            else:
                all_passed &= print_result(False, f"Response missing success: true, got: {data.get('success')}")
            
            if data.get("id") and len(data.get("id", "")) > 0:
                all_passed &= print_result(True, f"Response has non-empty id: {data.get('id')}")
                # Store the ID for later verification
                global created_contact_id
                created_contact_id = data.get("id")
            else:
                all_passed &= print_result(False, f"Response missing or empty id field, got: {data.get('id')}")
        else:
            all_passed &= print_result(False, f"POST /api/contact returned {response.status_code}, expected 200")
            
    except Exception as e:
        all_passed &= print_result(False, f"POST /api/contact request failed: {str(e)}")
    
    return all_passed

def test_contact_submission_invalid():
    """Test 3: POST /api/contact with missing required fields should return 400"""
    print_test_header("Contact Form Submission - Missing Required Fields")
    
    all_passed = True
    
    # Missing phone and message
    payload = {
        "name": "Incomplete User",
        "email": "incomplete@example.com",
        "subject": "Test"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/contact",
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"\nPOST /api/contact (missing phone and message)")
        print(f"Payload: {json.dumps(payload, indent=2)}")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 400:
            all_passed &= print_result(True, "POST /api/contact returned 400 for missing fields")
            
            data = response.json()
            
            if data.get("success") == False:
                all_passed &= print_result(True, "Response has success: false")
            else:
                all_passed &= print_result(False, f"Response should have success: false, got: {data.get('success')}")
            
            if data.get("error"):
                all_passed &= print_result(True, f"Response has error message: {data.get('error')}")
            else:
                all_passed &= print_result(False, "Response missing error message")
        else:
            all_passed &= print_result(False, f"POST /api/contact returned {response.status_code}, expected 400")
            
    except Exception as e:
        all_passed &= print_result(False, f"POST /api/contact request failed: {str(e)}")
    
    return all_passed

def test_contact_listing():
    """Test 4: GET /api/contact should return items array with proper structure"""
    print_test_header("Contact Messages Listing")
    
    all_passed = True
    
    try:
        response = requests.get(f"{BASE_URL}/contact", timeout=10)
        
        print(f"\nGET /api/contact")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:500]}...")  # Truncate if too long
        
        if response.status_code == 200:
            all_passed &= print_result(True, "GET /api/contact returned 200")
            
            data = response.json()
            
            if data.get("success") == True:
                all_passed &= print_result(True, "Response has success: true")
            else:
                all_passed &= print_result(False, f"Response missing success: true, got: {data.get('success')}")
            
            if "items" in data and isinstance(data["items"], list):
                all_passed &= print_result(True, f"Response has items array with {len(data['items'])} items")
                
                items = data["items"]
                
                # Check if our created record is present
                if 'created_contact_id' in globals():
                    found = any(item.get("id") == created_contact_id for item in items)
                    if found:
                        all_passed &= print_result(True, f"Created record with id {created_contact_id} found in listing")
                    else:
                        all_passed &= print_result(False, f"Created record with id {created_contact_id} NOT found in listing")
                
                # Verify structure of items
                if len(items) > 0:
                    first_item = items[0]
                    print(f"\nFirst item structure: {json.dumps(first_item, indent=2)}")
                    
                    # Check for uuid id field
                    if "id" in first_item and len(first_item.get("id", "")) > 0:
                        all_passed &= print_result(True, "Items have uuid 'id' field")
                    else:
                        all_passed &= print_result(False, "Items missing uuid 'id' field")
                    
                    # Check that _id is NOT present
                    if "_id" not in first_item:
                        all_passed &= print_result(True, "Items do NOT have Mongo '_id' field (correctly excluded)")
                    else:
                        all_passed &= print_result(False, "Items have Mongo '_id' field (should be excluded)")
                    
                    # Check sorting by createdAt descending
                    if len(items) > 1:
                        dates_sorted = True
                        for i in range(len(items) - 1):
                            if items[i].get("createdAt", "") < items[i+1].get("createdAt", ""):
                                dates_sorted = False
                                break
                        
                        if dates_sorted:
                            all_passed &= print_result(True, "Items are sorted by createdAt descending")
                        else:
                            all_passed &= print_result(False, "Items are NOT sorted by createdAt descending")
                else:
                    print("⚠️  WARNING: No items in database to verify structure")
            else:
                all_passed &= print_result(False, "Response missing 'items' array")
        else:
            all_passed &= print_result(False, f"GET /api/contact returned {response.status_code}, expected 200")
            
    except Exception as e:
        all_passed &= print_result(False, f"GET /api/contact request failed: {str(e)}")
    
    return all_passed

def main():
    print("\n" + "="*80)
    print("BACKEND API TEST SUITE - LAWYER PORTFOLIO CONTACT API")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Test Time: {datetime.now().isoformat()}")
    
    results = []
    
    # Run all tests
    results.append(("Health Endpoints", test_health_endpoints()))
    results.append(("Valid Contact Submission", test_contact_submission_valid()))
    results.append(("Invalid Contact Submission", test_contact_submission_invalid()))
    results.append(("Contact Listing", test_contact_listing()))
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    for test_name, passed in results:
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    total_passed = sum(1 for _, passed in results if passed)
    total_tests = len(results)
    
    print(f"\nTotal: {total_passed}/{total_tests} test suites passed")
    
    if total_passed == total_tests:
        print("\n🎉 ALL TESTS PASSED!")
        sys.exit(0)
    else:
        print(f"\n⚠️  {total_tests - total_passed} test suite(s) failed")
        sys.exit(1)

if __name__ == "__main__":
    main()
