const elementColorPicker = (element: string) => {
  switch (element) {
    case 'Anemo':
      return '#25995f';
    case 'Cryo':
      return '#a0d7e4';
    case 'Dendro':
      return '#4D8C3B';
    case 'Electro':
      return '#ffff00';
    case 'Geo':
      return '#ff7f00';
    case 'Hydro':
      return '#0000ff';
    case 'Pyro':
      return '#ff0000';
    case 'Physical':
      return '#ffffff';
    default:
      return '#ffffff';
  }
};

export default elementColorPicker;
