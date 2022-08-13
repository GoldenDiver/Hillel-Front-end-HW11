import StickerItem from "./StickerItem";
import { useCallback, useEffect, useState } from "react";
import  { useAsync } from "../hooks/common";
import { getStickers, createSticker, deleteSticker, updateSticker } from "../services/stickers";


export default function StickerList (){
    const {
        run,
        data: stickers,
        setData: setStickers,
        status,
    } = useAsync(getStickers, []);

    let styleStick = 0;
    const [edit, setEdit] = useState();
    const [newDescription, setNewDescription] = useState();
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {run()}, []);

    function stickStile () {
        styleStick += 1;
        if (styleStick === 4) {styleStick = 1};
        return "sticker" + " stick" + styleStick
    }

    function onDeleteButtonClick(id) {
        deleteSticker(id)
        const newStickers = stickers.filter((sticker) => sticker.id !== id);
        setStickers(newStickers);
    }

    function onSaveSticker (id, description) {
        const sticker = stickers.find((sticker) => sticker.id === id);
        const newSticker = { ...sticker, description: newDescription};
        if (description !== newDescription) {
            updateSticker(newSticker)
            setStickers(stickers.map((sticker) => (sticker.id === id ? newSticker : sticker)));
        }
        setEdit(undefined);
    }

    const onAddStickerClick =
        useCallback(() => {
            const newStick = {
                description: "New note"
            };
            createSticker(newStick)
            .then((data) => setStickers((prevStickers) => [...prevStickers, data]));
        }, [stickers])   

    function onStickerClick(id, description) {
        if (edit === undefined) {
            setEdit(id);
        } else {
            if (edit === id){
                onEditChange();
                onSaveSticker(id, description);
            }
        } 
    }

    function onEditChange(e) {
        setNewDescription(e.target.value)
    }

    function onModalStyle () {
        const className = 'modal';
        if (showModal) {
            return (className + ' modalShow')
        } else {
            return (className + ' modalHide')
        }
    }

    function onShowModal() {
        if(edit !== undefined) {
            setShowModal(true);
        }
    }

    function onModalCancelClick () {
        setShowModal(false);
        setEdit(undefined);
    };

    function onModalSaveClick () {
        setShowModal(false);
        onSaveSticker(edit);
    }

    return (
        <div className="board">
            {stickers.map((sticker) => (
            <StickerItem
                style={stickStile()}
                key={sticker.id}
                item={sticker}
                onStickerClick={onStickerClick}
                isEdit={edit}
                onEditChange={onEditChange}
                onDeleteButtonClick={onDeleteButtonClick}
                onShowModal={onShowModal}

            />
            ))}
            <div className={onModalStyle()}>
                <div className="modal-content">
                    <p>Do you want save changes?</p>
                    <div className="modal-buttons">
                        <button onClick={onModalCancelClick}>Cancel</button>
                        <button onClick={onModalSaveClick}>Save</button>
                    </div>
                </div>
            </div>
            <button className="addStick" onClick={onAddStickerClick}>+ Add stick</button>
        </div>
    )
}