const sortableListFactory = ({element}) => {
  return {
    exists: () => !!element
  };
};

export default sortableListFactory;
