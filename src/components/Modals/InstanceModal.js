import Modal from "../Modal";




export default function InstanceModal(props) {

    return (
        <Modal>

            { props.exit && (
                <button onClick={props.exit}></button>
            )}

        </Modal>
    )
}