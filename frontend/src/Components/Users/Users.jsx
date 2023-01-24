import './UsersStyle/User.Style.css'

const Users = ({targetUser}) => {
  console.log(targetUser)
  return (
      <div className='users'>
        <div className="user_content">
          <div className="title">All Users</div>
          <div className="user_cards">
              {targetUser.map((users,i) => (
                <>
                
                <div className="each_user" key={i}>
                  <div className="user_info">
                    <img src={users.profile} alt="" />
                    <h3>{users.username}</h3>
                    <p>{users.description}</p>
                  </div>
                </div>
                </>
              ))}
            </div>
        </div>
      </div>
  )
}

export default Users