import React, {useState} from "react"
import "../styles/onboarding-graphic.scss"
import Button from "./Button";
import shortId from 'shortid'


let OnboardingGraphic = ({onComplete}) => {

    const [currentScreen, setCurrentScreen] = useState(1)
    const finalScreen = 3
    

    let onNextClick = () => {
        if (currentScreen === finalScreen) {
            onComplete();
            return;
        }
        setCurrentScreen(currentScreen + 1)
    }

    return (
        <div className="onboarding-graphic">
            <div className={`screen screen${currentScreen} ${currentScreen > 1 ? 'animate-slide' : ''}`} key={shortId.generate()}>
                <div className="buttons">
                    {currentScreen === finalScreen
                        ? <Button classNames="next-btn mini go" label="Go!" onClick={onNextClick}/>
                        : <Button classNames="next-btn mini hollow" label="Next" onClick={onNextClick}/>
                    }
                </div>
            </div>
        </div>

    )
}
export default OnboardingGraphic
