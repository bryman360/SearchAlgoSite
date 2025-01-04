const Modal = ({ isOpen, onClose, children } : {isOpen: boolean, onClose: Function, children: any}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex
                        items-center justify-center
                        bg-black bg-opacity-50">
            <div className="bg-slate-600 rounded-lg
                            shadow-lg p-6 max-w-lg
                            w-full relative">
                <button
                    className="absolute top-2 right-2
                               text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    &#x2715; {/* Close button */}
                </button>
                {children}
            </div>
        </div>
    );
};

export const VideoModal = ({ isOpen, onClose, algorithmName, algorithmVideoEmbedFunc }: {isOpen: boolean, onClose: Function, algorithmName: string, algorithmVideoEmbedFunc: Function}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-bold">{algorithmName} Video Explanation</h2>
            <div className="">
                {algorithmVideoEmbedFunc()}
            </div>
        </Modal>
    );
};