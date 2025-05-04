import React, { createContext, useState } from 'react'

export const userStoriesRsponse = createContext()
export const googleAuthUserResponse = createContext()
export const userStoryPosetdResponse = createContext()

function ContextShare({ children }) {

    const [uploadUserStories, setUploadUserStorie] = useState([])
    const [googleAuthUserDetails, setGoogleAuthUserDetails] = useState(() => {
        const stored = sessionStorage.getItem("existingUser");
        try {
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.error("Failed to parse existingUser", error);
            return {};
        }
    });

    const [storyDetails, setStoryDetails] = useState({
        storyTitle: "",
        storyContent: "",
        storyCategory: "",
        _id : ""
    });
    

    const [userPostedStories, setUserPostedStories] = useState(true)
    // const [search, setSearch] = useState("");

    const [userAllStories, setUserAllStories] = useState([]);


    return (
        <>
            <googleAuthUserResponse.Provider value={{ googleAuthUserDetails, setGoogleAuthUserDetails }}>
                <userStoryPosetdResponse.Provider value={{ userPostedStories, setUserPostedStories }}>
                 <userStoriesRsponse.Provider value={{
                        uploadUserStories,
                        setUploadUserStorie,
                        storyDetails,
                        setStoryDetails,
                        userAllStories, setUserAllStories,
                        
                    }}>
                        {children}
                    </userStoriesRsponse.Provider>
                </userStoryPosetdResponse.Provider>
            </googleAuthUserResponse.Provider>
        </>
    )
}

export default ContextShare