// src/pages/dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { fetchSkills, fetchUsersBySkill, submitRequest } from '../api';
import { Card, CardHeader, CardContent, CardTitle } from '../components/RequestCard';
import Link from 'next/link';
import { LayoutDashboard, Users } from 'lucide-react';
import { User } from '../models/user';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;
  const [selectedSkill, setSelectedSkill] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const getSkills = async () => {
      try {
        const skillsData = await fetchSkills();
        setSkills(skillsData);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    getSkills();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/auth');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSkillChange = async (skill: string) => {
    setSelectedSkill(skill);
    setLoading(true);
    try {
      const users = await fetchUsersBySkill(skill);
      setFilteredUsers(users);
    } catch (error) {
      console.error('Error fetching users by skill:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedUser(null);
    setDescription('');
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmitRequest = async () => {
    if (selectedUser && username && description) {
      const requestData = {
        requesterUsername: username as string,
        targetUsername: selectedUser.username,
        title: `Request from ${username} to ${selectedUser.username}`,
        description,
      };

      try {
        await submitRequest(requestData);
        alert('Request submitted successfully');
        handleClosePopup();
      } catch (error) {
        alert('Failed to submit request');
      }
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/auth");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {username}</h1>
        <button onClick={handleSignOut}>Sign Out</button>
      </header>
      <main>
        <section className="skills-section">
          <h2>Select a Skill</h2>
          <select value={selectedSkill} onChange={(e) => handleSkillChange(e.target.value)}>
            <option value="">Select a skill</option>
            {skills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </section>
        <section className="users-section">
          <h2>Users with {selectedSkill}</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {filteredUsers.map((user) => (
                <li key={user.username} onClick={() => setSelectedUser(user)}>
                  {user.name}
                </li>
              ))}
            </ul>
          )}
        </section>
        {showPopup && selectedUser && (
          <div className="popup">
            <h3>Request {selectedUser.name}</h3>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Describe your request"
            />
            <button onClick={handleSubmitRequest}>Submit Request</button>
            <button onClick={handleClosePopup}>Cancel</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;