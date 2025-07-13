import firebase_admin
from firebase_admin import credentials, db, _apps

def initialize_firebase():
    # Check if Firebase is already initialized
    if _apps:
        return firebase_admin.get_app()
    
    try:
        # Initialize new app
        cred = credentials.Certificate(r"C:\Users\ASUS\OneDrive\Desktop\mini pro\project\serviceacckey.json")
        
        config = {
            'databaseURL': 'https://aeigs-3bcd0-default-rtdb.firebaseio.com'
        }
        
        return firebase_admin.initialize_app(cred, config)
        
    except Exception as e:
        print(f"❌ Firebase initialization error: {str(e)}")
        raise e

if __name__ == "__main__":
    # Test the initialization
    initialize_firebase()
    print("Database URL:", db.reference('/')._client.database_url)

# Create a test file to verify connection
import sys
sys.path.append(".")  # Add the project root to Python path

from config.firebase_config import initialize_firebase
from firebase_admin import db

def test_connection():
    initialize_firebase()
    
    # Try to write some test data
    ref = db.reference('test')
    ref.set({
        'message': 'Hello Firebase!'
    })
    
    # Read it back
    data = ref.get()
    print("Data from Firebase:", data)
    
    # Clean up
    ref.delete()

if __name__ == "__main__":
    test_connection() 