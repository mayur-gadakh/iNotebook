import React from 'react'
import { useContext } from 'react'

import CreateContext from '../context/createContext'


const About =() => {
const a=useContext(CreateContext);   
console.log(a.id)

    return (
       
        
            
                <h2> <h1>{a.name},{a.id}</h1>
                    
                    Welcome to iNotebook, the ultimate note-taking solution for modern professionals!         iNotebook is a powerful tool that allows you to take notes on your mobile device or computer and store them securely on the cloud.

                    Whether you're a student, a business professional, or just someone who wants to keep their thoughts organized, iNotebook has got you covered. With iNotebook, you can create, edit, and share notes seamlessly across all your devices, so you never have to worry about losing your important ideas or forgetting your to-do list.

                    iNotebook is designed to be easy to use, with a user-friendly interface that allows you to create and organize your notes with just a few clicks. You can categorize your notes with customizable tags, add images, videos, and voice memos, and even search your notes by keywords.

                    At iNotebook, we understand the importance of privacy and security, which is why we use state-of-the-art encryption technology to keep your notes safe and secure. You can access your notes from anywhere in the world, and share them with your colleagues, classmates, or friends with just a few taps.

                    So, if you're looking for a reliable note-taking solution that can keep up with your fast-paced lifestyle, look no further than iNotebook. Sign up today and start taking your notes to the next level!</h2>
            

        
    )
}

export default About
