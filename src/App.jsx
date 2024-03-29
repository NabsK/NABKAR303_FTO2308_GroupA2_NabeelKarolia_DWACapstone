import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Favorites from "./components/Favorites";
import { supabase } from "./supabaseInit.js";

function App() {
  const [user, setUser] = useState(null);
  const [audioSrc, setAudioSrc] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const audioData = localStorage.getItem("audio");
    if (audioData) {
      setAudioSrc(audioData);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      // Handle changes to localStorage here

      const audioData = localStorage.getItem("audio");
      setAudioSrc(audioData); // Set the new audio source first

      if (audioRef.current) {
        audioRef.current.currentTime = 0;

        audioRef.current.play(); // Start playing the audio automatically
      }
      // Update your component state or perform other actions
    };
    console.log("In window");
    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleTimestamp = async () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
        await supabase.from("Episode_Progress").update({ mp3_timestamp: currentTime }).eq("user_id", user.id);
      } else {
        console.log("User must be logged in to save episode progress.");
      }
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (audioRef.current && !audioRef.current.paused) {
        e.preventDefault();
        e.returnValue = "Audio is playing, Are you sure you want to leave?";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<HomePage audioSrc={audioSrc} setAudioSrc={setAudioSrc} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {<Route path="/favorites" element={<Favorites />} />}
      </Routes>

      {audioSrc && (
        <div className="audio-player-container">
          <audio controls autoPlay className="audio-player" ref={audioRef} onPause={handleTimestamp}>
            <source src={audioSrc} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </Router>
  );
}

export default App;
