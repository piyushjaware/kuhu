import React, {useEffect, useState} from "react"
import "../styles/onboarding-graphic.scss"
import Button from "./Button";
import shortId from 'shortid'


let OnboardingGraphic = ({onComplete}) => {

    const [currentScreen, setCurrentScreen] = useState(0)
    const finalScreen = 3

    useEffect(() => {
        // Keep the logo screen for 2 secs and then switch to the onboarding screen  
        setTimeout(onNextClick, 1500);
    }, [])


    const onNextClick = () => {
        if (currentScreen === finalScreen) {
            onComplete();
            return;
        }
        setCurrentScreen(currentScreen + 1)
    }

    const addSlideAnimationClass = () => {
        return currentScreen > 0 ? 'animate-slide' : '' // No need to add animation for the first screen 
    }

    return (
        <div className="onboarding-graphic">
            {/*The key is added only to force rerender of the component so that the animation ias applied every time*/}
            <div className={`screen screen${currentScreen} ${addSlideAnimationClass()}`} key={shortId.generate()}>
                {currentScreen > 0 &&
                <div className="buttons">
                    {currentScreen === finalScreen
                        ? <Button classNames="next-btn mini go" label="Go!" onClick={onNextClick}/>
                        : <Button classNames="next-btn mini hollow" label="Next" onClick={onNextClick}/>
                    }
                </div>
                }
            </div>
        </div>

    )
}
export default OnboardingGraphic
