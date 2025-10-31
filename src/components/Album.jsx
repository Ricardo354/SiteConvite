import { PlusIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";

function Album() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const IMAGES_PER_PAGE = 15;

  // 🔥 NEW STATES
  const [showModal, setShowModal] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [instagramUser, setInstagramUser] = useState("");

  const totalPages = Math.ceil(images.length / IMAGES_PER_PAGE);

  const currentImages = images.slice(
    (currentPage - 1) * IMAGES_PER_PAGE,
    currentPage * IMAGES_PER_PAGE
  );

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/list-images");
        const data = await res.json();
        if (data.images) setImages(data.images);
      } catch (err) {
        console.error("Erro:", err);
      }
    };
    fetchImages();
  }, []);

  // ✅ intercept file select to ask IG @
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setSelectedFiles(files);
    setShowModal(true);
  };

  // ✅ Confirm & upload
  const confirmUpload = async () => {
    if (!instagramUser.trim()) return alert("Digite seu @ do Instagram!");

    const renamedFiles = selectedFiles.map((file, i) => {
      const ext = file.name.split(".").pop();
      const newName = `${instagramUser}-${Date.now()}-${i}.${ext}`;
      return new File([file], newName, { type: file.type });
    });

    setImages((prev) => [...prev, ...renamedFiles]);
    setShowModal(false);
    await uploadToServer(renamedFiles);
  };

  const uploadToServer = async (files) => {
    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`image-${index}`, file, file.name);
      });
      await fetch("/api/upload", { method: "POST", body: formData });
    } catch (err) {
      console.error("Erro no upload:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {/* ✅ Modal sem mexer no resto */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[9999]">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-[400px]">
            <h2 className="text-2xl font-bold text-[#6d0605] mb-4">
              Seu @ do Instagram
            </h2>

            <input
              className="border p-2 w-full mb-4"
              type="text"
              placeholder="@exemplo"
              value={instagramUser}
              onChange={(e) => setInstagramUser(e.target.value)}
            />

            <button
              onClick={confirmUpload}
              className="bg-[#6d0605] text-white font-bold w-full py-2 rounded mb-2"
            >
              Confirmar Upload
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="text-[#6d0605] font-bold w-full py-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        {/* Lateral esquerda */}
        <div className="flex flex-col justify-around w-[6%] bg-black">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-[#3d0707] lg:w-[85%] w-[75%] h-[80px]" />
          ))}
        </div>

        <div className="w-[1%] bg-[#3d0707]" />

        {/* Hero / Grid */}
        <div className="flex flex-col items-center flex-1 bg-white border-12 lg:border-20 border-[#3d0707]">
          <div className="p-[2%]">
            <p className="text-5xl lg:text-8xl text-center mt-[10px] text-[#6d0605] font-bold font-anton">
              Álbum de Fotos Jully Fest 2025
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 lg:gap-8 gap-5 p-2 w-full lg:w-[90%]">
            {currentImages.length > 0 ? (
              currentImages.map((image, index) => {
                const globalIndex =
                  (currentPage - 1) * IMAGES_PER_PAGE + index;
                const isMiddleCol = globalIndex % 3 === 1;

                const fileName =
                  typeof image === "string"
                    ? image.split("/").pop()
                    : image.name;
                  const igName = fileName.match(/^(.+?)-/)?.[1] || "";

                return (
                  <div
                    key={globalIndex}
                    className={`flex flex-col w-[100%] lg:w-110 ${isMiddleCol ? "lg:mt-10" : ""
                      }`}
                  >
                    {/* IMAGEM */}
                    <div className="border-1 w-full h-30 lg:h-100 overflow-hidden">
                      <img
                        src={
                          image.url
                            ? image.url
                            : typeof image === "string"
                              ? image
                              : URL.createObjectURL(image)
                        }
                        alt={`Preview ${globalIndex + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* TEXTO - fora da borda */}
                    <p className="text-lg text-center font-bold mt-1 text-[#6d0605] break-all">
                      {igName}
                    </p>
                  </div>
                );
              })
            ) : (
              [...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className={`w-[100%] h-30 lg:w-110 lg:h-100 border-1 ${i % 3 === 1 ? "lg:mt-10" : ""
                    }`}
                />
              ))
            )}
          </div>

          {/* Pagination */}
          {images.length > IMAGES_PER_PAGE && (
            <div className="flex items-center gap-4 my-6 font-bold text-lg">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className={`px-4 py-2 border ${currentPage === 1
                  ? "opacity-50 cursor-not-al wed"
                  : "cursor-pointer"
                  }`}
              >
                ← Prev
              </button>

              <span>
                Página {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className={`px-4 py-2 border ${currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
                  }`}
              >
                Next →
              </button>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div className="fixed top-[59%] right-1 lg:right-47">
          <label htmlFor="file-upload" className="group relative flex items-center cursor-pointer">
            <div className="absolute right-full -mr-4 bg-[#906064] text-white text-2xl px-6 py-5 rounded-l-md opacity-0 translate-x-[10px] group-hover:opacity-100 font-anton font-bold transition-all duration-300 z-0">
              {uploading ? "Uploading..." : "Upload"}
            </div>

            <div className="relative z-10 bg-[#6d0605] hover:bg-[#3d0707] text-white p-6 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center">
              <PlusIcon className="size-8 lg:size-12 text-white" />
            </div>
          </label>

          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileSelect} // ✅ trocado
            disabled={uploading}
          />
        </div>

        <div className="w-[1%] bg-[#3d0707]" />
        <div className="flex flex-col items-end justify-around w-[6%] bg-black">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-[#3d0707] lg:w-[85%] w-[75%] h-[80px]" />
          ))}
        </div>
      </div>
    </>
  );
}

export default Album;
