from config.firebase_config import initialize_firebase
from firebase_admin import db, _apps
import time

def test_minimal():
    print("=== Starting Minimal Test ===")
    
    try:
        # Clear any existing Firebase apps
        if _apps:
            print("Cleaning up existing Firebase instances...")
            for app in _apps.values():
                firebase_admin.delete_app(app)
        
        # Initialize Firebase
        initialize_firebase()
        print("Firebase initialized ✓")
        
        # Add a small delay to ensure connection is established
        time.sleep(1)
        
        print("\nTrying to write test data...")
        try:
            ref = db.reference('/test')
            test_data = {
                'timestamp': int(time.time()),
                'message': 'Test connection'
            }
            print(f"Writing data: {test_data}")
            
            # Attempt write
            ref.set(test_data)
            print("Write successful! ✓")
            
            # Try to read it back
            print("\nTrying to read data back...")
            result = ref.get()
            print(f"Read data: {result}")
            print("Read successful! ✓")
            
            # Clean up
            print("\nCleaning up test data...")
            ref.delete()
            print("Cleanup successful! ✓")
            
            print("\n✅ All tests passed! Database connection is working!")
            
        except Exception as db_error:
            print("\n❌ Database operation error:")
            print(f"Error type: {type(db_error).__name__}")
            print(f"Error message: {str(db_error)}")
            
    except Exception as e:
        print("\n❌ Main error:")
        print(f"Error type: {type(e).__name__}")
        print(f"Error message: {str(e)}")
    
    finally:
        print("\nTest completed.")

if __name__ == "__main__":
    test_minimal()