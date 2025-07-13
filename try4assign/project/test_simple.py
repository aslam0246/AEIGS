from config.firebase_config import initialize_firebase
from firebase_admin import db

def simple_test():
    try:
        # Initialize Firebase
        initialize_firebase()
        print("Step 1: Firebase initialized")

        # Try to get the root reference
        root_ref = db.reference('/')
        print("Step 2: Got database reference")

        # Try to read from root
        try:
            data = root_ref.get()
            print("Step 3: Successfully read from database")
            print("Current data:", data)
        except Exception as read_error:
            print("Read error:", str(read_error))

        # Try to write simple data
        try:
            test_ref = root_ref.child('test')
            test_ref.set({'message': 'test'})
            print("Step 4: Successfully wrote to database")
        except Exception as write_error:
            print("Write error:", str(write_error))

    except Exception as e:
        print("Main error:", str(e))

if __name__ == "__main__":
    simple_test() 