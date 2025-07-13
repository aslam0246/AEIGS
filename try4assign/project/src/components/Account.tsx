"use client";
import { useEffect, useState } from "react";
import { db, auth, setDoc, getDoc, doc } from "../firebaseConfig"; 
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useAuthState } from "react-firebase-hooks/auth";

interface Profile {
  name: string;
  role: string;
  about: string;
  location: string;
  contact: string;
  skills: string;
  interests: string;
}

const Account: React.FC = () => {
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState<Profile>({
    name: "",
    role: "",
    about: "",
    location: "",
    contact: "",
    skills: "",
    interests: ""
  });

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as Profile);
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    if (user) {
      await setDoc(doc(db, "users", user.uid), profile);
      alert("Profile updated!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[400px]">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-center">Profile</h2>
          <Input placeholder="Name" name="name" value={profile.name} onChange={handleChange} />
          <Input placeholder="Role" name="role" value={profile.role} onChange={handleChange} />
          <Input placeholder="About" name="about" value={profile.about} onChange={handleChange} />
          <Input placeholder="Location" name="location" value={profile.location} onChange={handleChange} />
          <Input placeholder="Contact" name="contact" value={profile.contact} onChange={handleChange} />
          <Input placeholder="Skills" name="skills" value={profile.skills} onChange={handleChange} />
          <Input placeholder="Interests" name="interests" value={profile.interests} onChange={handleChange} />
          <Button onClick={saveProfile} className="w-full">Save</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Account;