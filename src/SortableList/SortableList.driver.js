const sortableListFactory = ({element}) => {
  console.log(element.innerHTML)
  return {
    exists: () => !!element
  };
};

export default sortableListFactory;
