import ShowCase from "../ShowCase/ShowCase"
import Users from "../Users/Users"

const Home = ({targetUser, courses}) => {
  return (
    <>
      <ShowCase courses={courses} />
      <Users targetUser={targetUser} />
    </>
  )
}

export default Home