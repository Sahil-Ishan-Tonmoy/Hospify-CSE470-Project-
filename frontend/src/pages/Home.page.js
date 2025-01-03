import { useEffect, useState } from "react"

// components
import UserDetails from "../components/UserDetails.component"

const Home = () => {
  const [Users, setWorkouts] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json()

      if (response.ok) {
        setWorkouts(json)
      }
    }

    fetchWorkouts()
  }, [])

    
    const handleSignUpClick = () => {
        window.location.href = "http://localhost:3000/signup";
    };
   

    return (
        <div className="home">
            <div className="users">
                {Users&& Users.map((User)=>(
                    <UserDetails key={User._id} User= {User}/>
                ))}
            </div>
            <div>
            <button onClick={handleSignUpClick} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                Sign Up
            </button>
            </div>
        </div>
        
    )
}

export default Home