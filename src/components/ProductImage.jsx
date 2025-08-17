import React, { useState, useEffect, useRef } from 'react'

const ProductImage = ({ product }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const main = product.images.main;
  const thumbnails = product.images.thumbnails;
  const lightboxRef = useRef(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? main.length - 1 : prevIndex - 1 
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === main.length - 1 ? 0 : prevIndex + 1
    )
  }

  const handleSlide = (index) => {
    setCurrentIndex(index);
  }

  const toggleLightbox = () => {
    setLightboxOpen(!lightboxOpen);
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      toggleLightbox();
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      toggleLightbox();
    }
  }

  useEffect(() => {
    if (lightboxOpen) {
      lightboxRef.current?.focus();
    }
  }, [lightboxOpen])

  const NavigationButton = ({ direction, onClick, className='' }) => (
    <button 
      type="button" 
      onClick={onClick} 
      className={`${className}`} 
      aria-label={`${direction === 'previous' ? 'Previous' : 'Next'} image`}
    >
      <img 
        src={`images/icon-${direction}.svg`} 
        alt={`${direction.charAt(0).toUpperCase() + direction.slice(1)} Icon`} 
        aria-hidden="true" 
      />
    </button>
  )

  const Thumbnail = ({ className='' }) => (
    <div className={`product-all-images ${className}`} role="group" aria-label="Product image thumbnails">
      {thumbnails.map((thumbnail, index) => (
        <button 
          key={index} 
          type="button" 
          onClick={() => handleSlide(index)} 
          className={currentIndex === index ? 'active' : ''}
        >
          <img src={thumbnail} alt={`Thumbnail + ${index + 1}`} />
        </button>
      ))}
    </div>
  )

  const renderDesktopDesign = () => {
    return (
      <div className='product-image-desktop'>
        <button onClick={toggleLightbox} aria-label="Open image in full view">
          <img src={main[currentIndex]} alt={`Product ${currentIndex + 1}`} />
        </button>
        <Thumbnail />
      </div>
    )
  }

  return (
    <section className='product-image-container' aria-label="Product images">

      {/* Mobile */}
      <div className='product-image-mobile'>
        <NavigationButton direction="previous" onClick={handlePrev} className='left-3' />
        <div className='product-images'>
          <div>
            <img src={main[currentIndex]} alt={`Product ${currentIndex + 1}`} />
          </div>
        </div>
        <NavigationButton direction="next" onClick={handleNext} className='right-3' />
      </div>


      {/* Desktop */}
      {renderDesktopDesign()}


      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className='lightbox-container' 
          onClick={handleBackdropClick} 
          role="dialog" 
          aria-modal="true"
          tabIndex={-1}
          ref={lightboxRef}
          onKeyDown={handleKeyDown}
        >
          <div className='lightbox-wrapper'>
            <button type="button" onClick={toggleLightbox} className='lightbox-close' aria-label="Close full image view">
              <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
                <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="white" fillRule="evenodd"/>
              </svg>
            </button>
            <div className='product-image-desktop space-y-6'>
              <div className='lightbox-image-wrapper'>
                <div className='lightbox-button'>
                  <NavigationButton direction="previous" onClick={handlePrev} className='-left-5' />
                  <div className='lightbox-image-container'>
                    <img src={main[currentIndex]} alt={`Product ${currentIndex + 1}`} className='w-full h-full object-contain'/>
                  </div>
                  <NavigationButton direction="next" onClick={handleNext} className='-right-5' />
                </div>
              </div>
              <Thumbnail className='px-14 space-x-4'/>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductImage