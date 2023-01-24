import './AboutStyle/About.Style.css'
import { Link } from "react-router-dom"
import Header from '../Header/Header'
import img from '../Sources/Software_engineer.png'

const About = () => {
  return (
    <>
    <Header />
    <div className='about_section'>
        <div className="about_content">
            <h2 className="title">ABOUT <span className="content_color">US</span></h2>
            <div className="contents">
                <div className="right_content">
                    <h3 className="about_title">Read More 
                    <span className='content_color'> Our Contents</span></h3>
                    <p className="lead">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat saepe possimus iste nostrum! Unde cupiditate doloribus vel deleniti tempora iusto? Repellat illo consequuntur assumenda reprehenderit porro consequatur corrupti, eius ab libero unde? Et doloremque facilis blanditiis quibusdam placeat animi perspiciatis, maiores consequatur hic accusamus, neque eveniet, cupiditate pariatur molestiae ad rem incidunt assumenda libero veniam consequuntur cumque! Nobis, culpa eaque!
                    </p>
                    <div className="flex">
                        <Link to='/register' 
                            className='btn btn-login'>
                        Read More... </Link>

                    </div>
                </div>
                <div className="left_content">
                    <img src={img} alt="" />
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default About