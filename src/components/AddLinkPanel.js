import Button from "./Button"

let AddLinkPanel = ({ onLinkSave, onLinkSaveCancel }) => {

    const onSave = () => {
        onLinkSave();
    }
    
    return (
        <div className="add-link">
            Add Link
            <Button label="Cancel" iconClass="cancel" onClick={onLinkSaveCancel}>/</Button>
            <Button label="Save Link" iconClass="save" onClick={onSave}>/</Button>

        </div>
    )
}
export default AddLinkPanel
