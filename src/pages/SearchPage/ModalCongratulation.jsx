import EnvelopeLetter from "./EnvelopeLetter";
import { Modal } from "antd";

export default function ModalCongratulation({ isOpen, onClose, candidate }) {
    return (
        <Modal
            open={isOpen}
            onCancel={onClose}
            className="relative"
            // width={650}
            centered
            footer={null}
        >
            <EnvelopeLetter candidate={candidate} />
        </Modal>
    )
}