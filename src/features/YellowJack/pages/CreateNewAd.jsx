import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import PageHeader from '@/shared/components/ui/PageHeader.jsx';

// Mock images for the image picker (matching the reference code)
const MOCK_IMAGES = [
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=200&q=80',
  'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=200&q=80',
];

export default function CreateNewAd({ scale = 1, onBack }) {
  // Form state management
  const [formData, setFormData] = useState({
    title: '',
    type: 'Service',
    price: '',
    description: '',
    fullDetail: '',
    images: [],
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

  const dropdownRef = useRef(null);
  const imagePickerRef = useRef(null);
  const selectedImagesRef = useRef(null);

  const adTypes = ['Service', 'Vehicle', 'Real Estate', 'Items'];
  const maxImages = 5;

  // Handle outside clicks to close dropdowns/pickers
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        imagePickerRef.current &&
        !imagePickerRef.current.contains(event.target)
      ) {
        setIsImagePickerOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle horizontal scrolling for the selected images container
  useEffect(() => {
    const scrollContainer = selectedImagesRef.current;
    const handleWheel = (event) => {
      if (scrollContainer && formData.images.length > 0) {
        event.preventDefault();
        scrollContainer.scrollLeft += event.deltaY;
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('wheel', handleWheel, {
        passive: false,
      });
    }
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('wheel', handleWheel);
      }
    };
  }, [formData.images]);

  // Input change handler with optional max length
  const handleInputChange = (e, field, maxLength = null) => {
    let value = e.target.value;
    if (maxLength && value.length > maxLength) return;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Add an image from the picker
  const handleAttachmentClick = (imageSrc) => {
    if (formData.images.length < maxImages) {
      setFormData((prev) => ({ ...prev, images: [...prev.images, imageSrc] }));
    }
    setIsImagePickerOpen(false);
  };

  // Remove a selected image
  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  // Submit handler
  const handleSubmit = () => {
    console.log('Form Submitted:', formData);
    // onBack();
  };

  return (
    <div className="flex flex-col items-center w-full h-full bg-app overflow-hidden relative">
      <div
        className="flex flex-col relative h-full w-full"
        style={{ width: `${265 * scale}px` }}
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          
          .custom-input:focus { outline: none; }
          .custom-input::placeholder { color: var(--color-muted); }

          .custom-input[type="number"]::-webkit-inner-spin-button,
          .custom-input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          .custom-input[type="number"] { -moz-appearance: textfield; }
        `}</style>

        {/* ----- Header Section ----- */}
        <div
          className="shrink-0 w-full relative z-20 transition-all"
          style={{
            paddingTop: `${20 * scale}px`,
            paddingLeft: `${10 * scale}px`,
            paddingRight: `${10 * scale}px`,
            paddingBottom: `${10 * scale}px`,
          }}
        >
          <div className="relative z-30 pointer-events-auto">
            <PageHeader
              scale={scale}
              onLeftClick={onBack}
              showRightButton={false}
            />
          </div>

          <div
            className="absolute flex items-center pointer-events-none z-10"
            style={{
              top: `${20 * scale}px`,
              left: `${(10 + 25 + 8) * scale}px`,
              height: `${25 * scale}px`,
            }}
          >
            <span
              className="font-bold flex items-center leading-none"
              style={{ fontSize: `${16 * scale}px`, gap: `${4 * scale}px` }}
            >
              <span style={{ color: '#FFCC00' }}>New</span>
              <span className="text-white">Ad</span>
            </span>
          </div>
        </div>

        {/* ----- Form Body Content ----- */}
        <div className="flex flex-col items-center flex-1 overflow-y-auto hide-scrollbar relative z-10">
          <div
            className="flex flex-col"
            style={{
              width: `${245 * scale}px`,
              gap: `${10 * scale}px`,
              paddingBottom: `${80 * scale}px`,
            }}
          >
            {/* 1. Ad Title Input */}
            <div
              className="flex flex-col w-full"
              style={{ gap: `${5 * scale}px` }}
            >
              <div
                className="flex items-center w-full"
                style={{
                  padding: `0 ${10 * scale}px`,
                  height: `${12 * scale}px`,
                  gap: `${3 * scale}px`,
                }}
              >
                <span
                  className="font-bold text-white leading-none"
                  style={{ fontSize: `${10 * scale}px` }}
                >
                  Ad Title
                </span>
                <span
                  className="text-muted leading-none"
                  style={{ fontSize: `${8 * scale}px`, fontWeight: 400 }}
                >
                  {formData.title.length}/30
                </span>
              </div>
              <input
                type="text"
                className="custom-input w-full text-white bg-one"
                value={formData.title}
                onChange={(e) => handleInputChange(e, 'title', 30)}
                style={{
                  height: `${25 * scale}px`,
                  borderRadius: `${5 * scale}px`,
                  padding: `${5 * scale}px ${10 * scale}px`,
                  fontSize: `${10 * scale}px`,
                }}
              />
            </div>

            {/* 2. Ad Type Select */}
            <div
              className="flex flex-col w-full relative"
              style={{ gap: `${5 * scale}px` }}
              ref={dropdownRef}
            >
              <div
                className="flex items-center w-full"
                style={{
                  padding: `0 ${10 * scale}px`,
                  height: `${12 * scale}px`,
                }}
              >
                <span
                  className="font-bold text-white leading-none"
                  style={{ fontSize: `${10 * scale}px` }}
                >
                  Ad Type
                </span>
              </div>
              <div
                className="flex items-center justify-between w-full cursor-pointer bg-one"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  height: `${25 * scale}px`,
                  borderRadius: `${5 * scale}px`,
                  padding: `${5 * scale}px ${5 * scale}px ${5 * scale}px ${10 * scale}px`,
                }}
              >
                <span
                  className="text-white-muted"
                  style={{ fontSize: `${10 * scale}px` }}
                >
                  {formData.type}
                </span>
                <div
                  className="flex items-center justify-center shrink-0 transition-transform bg-six"
                  style={{
                    width: `${15 * scale}px`,
                    height: `${15 * scale}px`,
                    borderRadius: `${3 * scale}px`,
                    transform: isDropdownOpen
                      ? 'rotate(90deg)'
                      : 'rotate(-90deg)',
                  }}
                >
                  <i
                    className="fi fi-ss-angle-small-left text-white-muted flex items-center justify-center"
                    style={{ fontSize: `${12 * scale}px` }}
                  />
                </div>
              </div>

              {/* Dropdown Options */}
              {isDropdownOpen && (
                <div
                  className="absolute w-full overflow-hidden z-50 flex flex-col"
                  style={{
                    top: `${42 * scale}px`,
                    backgroundColor: 'var(--color-one)',
                    borderRadius: `${5 * scale}px`,
                    border: `1px solid var(--color-border)`,
                  }}
                >
                  {adTypes.map((type, index) => (
                    <div
                      key={index}
                      className="w-full text-white cursor-pointer hover:bg-item-hover transition-colors"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, type }));
                        setIsDropdownOpen(false);
                      }}
                      style={{
                        padding: `${5 * scale}px ${10 * scale}px`,
                        fontSize: `${10 * scale}px`,
                      }}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. Price Input */}
            <div
              className="flex flex-col w-full"
              style={{ gap: `${5 * scale}px` }}
            >
              <div
                className="flex items-center w-full"
                style={{
                  padding: `0 ${10 * scale}px`,
                  height: `${12 * scale}px`,
                }}
              >
                <span
                  className="font-bold text-white leading-none"
                  style={{ fontSize: `${10 * scale}px` }}
                >
                  Price
                </span>
              </div>
              <div
                className="flex items-center w-full bg-one"
                style={{
                  height: `${25 * scale}px`,
                  borderRadius: `${5 * scale}px`,
                  padding: `${5 * scale}px ${5 * scale}px ${5 * scale}px ${10 * scale}px`,
                }}
              >
                <input
                  type="number"
                  className="custom-input flex-1 bg-transparent text-white"
                  placeholder="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange(e, 'price')}
                  style={{ fontSize: `${10 * scale}px` }}
                />
                <i
                  className="fi-rs-dollar text-muted shrink-0 flex items-center justify-center"
                  style={{ fontSize: `${13 * scale}px` }}
                />
              </div>
            </div>

            {/* 4. Description Input */}
            <div
              className="flex flex-col w-full"
              style={{ gap: `${5 * scale}px` }}
            >
              <div
                className="flex items-center w-full"
                style={{
                  padding: `0 ${10 * scale}px`,
                  height: `${12 * scale}px`,
                  gap: `${3 * scale}px`,
                }}
              >
                <span
                  className="font-bold text-white leading-none"
                  style={{ fontSize: `${10 * scale}px` }}
                >
                  Description
                </span>
                <span
                  className="text-muted leading-none"
                  style={{ fontSize: `${8 * scale}px`, fontWeight: 400 }}
                >
                  {formData.description.length}/50
                </span>
              </div>
              <input
                type="text"
                className="custom-input w-full text-white bg-one"
                value={formData.description}
                onChange={(e) => handleInputChange(e, 'description', 50)}
                style={{
                  height: `${25 * scale}px`,
                  borderRadius: `${5 * scale}px`,
                  padding: `${5 * scale}px ${10 * scale}px`,
                  fontSize: `${10 * scale}px`,
                }}
              />
            </div>

            {/* 5. Full Detail Textarea */}
            <div
              className="flex flex-col w-full"
              style={{ gap: `${5 * scale}px` }}
            >
              <div
                className="flex items-center w-full"
                style={{
                  padding: `0 ${10 * scale}px`,
                  height: `${12 * scale}px`,
                  gap: `${3 * scale}px`,
                }}
              >
                <span
                  className="font-bold text-white leading-none"
                  style={{ fontSize: `${10 * scale}px` }}
                >
                  Full Detail
                </span>
                <span
                  className="text-muted leading-none"
                  style={{ fontSize: `${8 * scale}px`, fontWeight: 400 }}
                >
                  {formData.fullDetail.length}/300
                </span>
              </div>
              <textarea
                className="custom-input w-full text-white resize-none bg-one"
                value={formData.fullDetail}
                onChange={(e) => handleInputChange(e, 'fullDetail', 300)}
                style={{
                  height: `${113 * scale}px`,
                  borderRadius: `${5 * scale}px`,
                  padding: `${5 * scale}px ${10 * scale}px`,
                  fontSize: `${10 * scale}px`,
                }}
              />
            </div>

            {/* ----- Image Upload Section ----- */}
            <div
              className="flex flex-col w-full relative"
              style={{ gap: `${5 * scale}px` }}
              ref={imagePickerRef}
            >
              <div
                className="flex items-center w-full"
                style={{
                  height: `${12 * scale}px`,
                  gap: `${3 * scale}px`,
                }}
              >
                <span
                  className="font-bold text-white leading-none"
                  style={{ fontSize: `${10 * scale}px` }}
                >
                  Images
                </span>
                <span
                  className="text-muted leading-none"
                  style={{ fontSize: `${8 * scale}px`, fontWeight: 400 }}
                >
                  {formData.images.length}/{maxImages}
                </span>
              </div>

              <div
                className="flex items-center w-full justify-between"
                style={{ height: `${45 * scale}px`, gap: `${5 * scale}px` }}
              >
                {/* Selected Images List */}
                <div
                  ref={selectedImagesRef}
                  className="flex items-center overflow-x-auto hide-scrollbar scroll-smooth h-full flex-1"
                  style={{ gap: `${5 * scale}px` }}
                >
                  {formData.images.map((imgSrc, index) => (
                    <div
                      key={index}
                      className="relative group shrink-0 cursor-pointer overflow-hidden transition-all"
                      style={{
                        width: `${45 * scale}px`,
                        height: `${45 * scale}px`,
                        borderRadius: `${5 * scale}px`,
                      }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <img
                        src={imgSrc}
                        alt={`selected-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-[#FF383C]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <i
                          className="fi fi-ss-trash text-white flex items-center justify-center"
                          style={{ fontSize: `${15 * scale}px` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Image Button */}
                {formData.images.length < maxImages && (
                  <button
                    onClick={() => setIsImagePickerOpen(!isImagePickerOpen)}
                    className="shrink-0 flex items-center justify-center hover:opacity-80 transition-opacity ml-auto bg-six"
                    style={{
                      width: `${45 * scale}px`,
                      height: `${45 * scale}px`,
                      borderRadius: `${5 * scale}px`,
                    }}
                  >
                    <i
                      className="fi fi-ss-plus flex justify-center items-center text-white"
                      style={{ fontSize: `${15 * scale}px` }}
                    />
                  </button>
                )}
              </div>

              {/* Image Picker Popup */}
              {isImagePickerOpen && (
                <div
                  className="absolute z-50 grid grid-cols-2 grid-rows-3 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.25)] border border-border bg-modal"
                  style={{
                    width: `${222 * scale}px`,
                    height: `${215 * scale}px`,
                    padding: `${5 * scale}px`,
                    gap: `${5 * scale}px`,
                    borderRadius: `${10 * scale}px`,
                    bottom: `${50 * scale}px`,
                    right: 0,
                  }}
                >
                  {MOCK_IMAGES.map((imgSrc, index) => (
                    <button
                      key={index}
                      onClick={() => handleAttachmentClick(imgSrc)}
                      className="outline-none relative overflow-hidden flex items-center justify-center hover:opacity-80 transition-opacity"
                      style={{ borderRadius: `${5 * scale}px` }}
                    >
                      <img
                        src={imgSrc}
                        alt={`attachment-${index}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ----- Action Buttons (Footer) ----- */}
        <div
          className="absolute bottom-0 left-0 w-full flex justify-end items-end z-20 pointer-events-none"
          style={{
            paddingBottom: `${20 * scale}px`,
            paddingRight: `${10 * scale}px`,
          }}
        >
          <div
            className="flex items-center pointer-events-auto"
            style={{ gap: `${5 * scale}px` }}
          >
            <button
              onClick={onBack}
              className="flex items-center justify-center shrink-0 hover:opacity-90 transition-all relative overflow-hidden bg-six"
              style={{
                width: `${35 * scale}px`,
                height: `${35 * scale}px`,
                borderRadius: '50%',
                border: `${1 * scale}px solid var(--color-border)`,
                backdropFilter: `blur(${10 * scale}px)`,
                WebkitBackdropFilter: `blur(${10 * scale}px)`,
              }}
            >
              <i
                className="fi fi-rs-cross flex items-center justify-center absolute text-muted"
                style={{ fontSize: `${13 * scale}px` }}
              />
            </button>

            <button
              onClick={handleSubmit}
              className="flex items-center justify-center hover:opacity-90 transition-all"
              style={{
                width: `${85 * scale}px`,
                height: `${35 * scale}px`,
                gap: `${5 * scale}px`,
                padding: `${5 * scale}px ${15 * scale}px`,
                borderRadius: `${25 * scale}px`,
                backgroundColor: 'rgba(255, 204, 0, 0.8)',
                border: `${1 * scale}px solid var(--color-border)`,
                backdropFilter: `blur(${10 * scale}px)`,
                WebkitBackdropFilter: `blur(${10 * scale}px)`,
                boxShadow: `0px ${4 * scale}px ${10 * scale}px 0px rgba(0, 0, 0, 0.25)`,
              }}
            >
              <i
                className="fi fi-rs-paper-plane text-white flex items-center justify-center"
                style={{ fontSize: `${13 * scale}px` }}
              />
              <span
                className="font-bold text-white"
                style={{ fontSize: `${10 * scale}px` }}
              >
                SUBMIT
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CreateNewAd.propTypes = {
  scale: PropTypes.number,
  onBack: PropTypes.func.isRequired,
};
