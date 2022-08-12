

export default function StickerLItem ({style, item: {description, id}, onStickerClick, isEdit, onEditChange, onDeleteButtonClick, onShowModal}){
    function editing () {
        return (
            isEdit===id) ? (
            <textarea 
                className="textarea"
                onChange={onEditChange}
                onBlur={onShowModal}
                defaultValue={description} 
                onClick={(e) => {e.stopPropagation()}}
            />) : (description)
    }

    function editClick () {
        onStickerClick(id, description);
    }

    function deleteClick(e){
        e.stopPropagation(); 
        onDeleteButtonClick(id);
    }

    return (
        <div 
            className={style}
            >
            <div className="tools">
                <button 
                    className="delete"
                    onClick={deleteClick}>
                    X
                </button>
            </div>
            <div className="text" 
                onClick={editClick}
                >
                {editing()}
            </div>
        </div>
    )
}