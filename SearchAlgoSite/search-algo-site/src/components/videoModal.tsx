import { MouseEventHandler } from "react";

const Modal = ({ isOpen, onClose, children } : {isOpen: boolean, onClose: MouseEventHandler, children: any}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex
                        items-center justify-center
                        bg-black bg-opacity-50" onClick={onClose}>
            <div className="bg-slate-600 rounded-lg
                            shadow-lg md:p-6 sm:p-0 max-w-lg
                            md:w-1/2 sm: w-full h-1/2 relative">
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

export const VideoModal = ({ isOpen, onClose, algorithmName, algorithmVideoSrc }: {isOpen: boolean, onClose: MouseEventHandler, algorithmName: string, algorithmVideoSrc: string}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-lg font-bold">{algorithmName} Video Explanation</h2>
            <div className="w-full h-full" style={{paddingBottom: 1.5 + "rem"}}>
                {/* @ts-ignore: Embed came directly from YouTube. Error about frameborder is not an issue. */}
                <iframe width="100%" height="100%" src={algorithmVideoSrc} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="allowfullscreen"></iframe>
            </div>
        </Modal>
    );
};