const GenericModalLayoutDriverFactory = component => {
  const hasClass = className => component.getAttribute('class')
    .then(classes => classes
      .split(' ')
      .indexOf(className) !== -1
    );

  return {
    getElement: () => component,
    isFullscreen: () => hasClass('fullscreenContainer')
  };
};

export default GenericModalLayoutDriverFactory;
