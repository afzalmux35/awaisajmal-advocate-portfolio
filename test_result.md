#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: "Ultra-premium personal portfolio website for Muhammad Awais Ajmal, Advocate High Court (Multan). Dark luxury gold-on-black theme with cinematic hero, animated sections, and a working contact form that stores submissions."

backend:
  - task: "Contact form submission API (POST /api/contact)"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Implemented POST /api/contact storing {id(uuid), name, phone, email, subject, message, createdAt, read} in Mongo collection contact_messages. Validates required name/phone/message -> 400. Returns success:true with message + id."
        -working: true
        -agent: "testing"
        -comment: "✅ TESTED & WORKING. Valid submission test: POST /api/contact with {name, phone, email, subject, message} returned 200, success:true, and uuid id (5361122c-17ed-4285-be2f-f08aac122ab8). Invalid submission test: Missing required fields (phone, message) correctly returned 400 with success:false and error message 'Name, phone and message are required.' All validation and response structure working as expected."
  - task: "Contact messages listing API (GET /api/contact)"
    implemented: true
    working: true
    file: "app/api/[[...path]]/route.js"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "GET /api/contact returns list of stored messages sorted by createdAt desc, projection excludes _id. Also GET /api and /api/health return status ok."
        -working: true
        -agent: "testing"
        -comment: "✅ TESTED & WORKING. GET /api/contact returned 200 with success:true and items array. Verified: (1) Created record found in listing, (2) Items have uuid 'id' field, (3) Mongo '_id' field correctly excluded via projection, (4) Items sorted by createdAt descending. GET /api and GET /api/health both return 200 with status:'ok'. All endpoints functioning correctly."

frontend:
  - task: "Full premium portfolio single page (all sections + animations)"
    implemented: true
    working: "NA"
    file: "app/page.js"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        -working: "NA"
        -agent: "main"
        -comment: "Built hero, about, qualifications timeline, practice areas, why choose, achievements counters, case studies, testimonials slider, gallery masonry+lightbox, philosophy, CTA, contact form, footer. Verified visually via screenshots. Not yet tested by automated agent."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: false

test_plan:
  current_focus:
    - "Contact form submission API (POST /api/contact)"
    - "Contact messages listing API (GET /api/contact)"
  stuck_tasks: []
  test_all: false
  test_priority: "high_first"

agent_communication:
    -agent: "main"
    -message: "Please test backend contact API only. Base path is /api. Test: 1) GET /api/health returns ok. 2) POST /api/contact with valid {name, phone, email, subject, message} returns success:true and an id. 3) POST /api/contact missing required fields (no phone/message) returns 400 success:false. 4) GET /api/contact returns items array including the created record (no _id field, uses uuid id). MongoDB is local via MONGO_URL; DB_NAME from env."
    -agent: "testing"
    -message: "✅ Backend testing complete. All 4 test scenarios PASSED: (1) Health endpoints (GET /api and /api/health) return status:ok, (2) Valid contact submission returns 200 with success:true and uuid id, (3) Invalid submission (missing required fields) returns 400 with success:false and error message, (4) Contact listing returns items with uuid id (no _id), sorted by createdAt desc. Created backend_test.py for comprehensive API testing. Note: Next.js logs show warning about params.path needing await (Next.js 15 requirement), but APIs are functioning correctly. Backend is fully working - ready for main agent to summarize and finish."
