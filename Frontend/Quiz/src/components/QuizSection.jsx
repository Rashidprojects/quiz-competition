import { useEffect, useState } from "react"
import axios from "axios"

const QuizSection = () => {
  const [quizzes, setQuizzes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=> {
    axios.get("http://127.0.0.1:8000/api/quizzes/") 
      .then(res => {
        // console.log("The fetched quizes is : ",res.data)
        setQuizzes(res.data)
        setLoading(false)
      })
      .catch(error => console.error('Error fetching data:', error))
  }, []);

  console.log('fetched quiz:', quizzes)
  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p>Error loading quizzes: {error.message}</p>;

  return (
    <div>
      <h1>Quizzess</h1>
      <ul>
        {
          quizzes.map(quiz => (
            <li key={quiz.id}>
              <h2>{quiz.title}</h2>
              <p>{quiz.description}</p>
            </li>
          ))
        }
      </ul> 
    </div>

  )
}

export default QuizSection