const Modal = ({ isOpen, onClose, children } : {isOpen: boolean, onClose: Function, children: any}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex
                        items-center justify-center
                        bg-black bg-opacity-50" onClick={onClose}>
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

export const VideoModal = ({ isOpen, onClose, algorithmName, algorithmVideoSrc }: {isOpen: boolean, onClose: Function, algorithmName: string, algorithmVideoSrc: string}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-bold">{algorithmName} Video Explanation</h2>
            <div className="">
                <iframe width="464" height="261" src={algorithmVideoSrc} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </Modal>
    );
};