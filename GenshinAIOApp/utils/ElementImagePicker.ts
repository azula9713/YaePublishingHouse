import PyroPNG from '../assets/elements/Element_Pyro.png';
import HydroPNG from '../assets/elements/Element_Hydro.png';
import DendroPNG from '../assets/elements/Element_Dendro.png';
import ElectroPNG from '../assets/elements/Element_Electro.png';
import AnemoPNG from '../assets/elements/Element_Anemo.png';
import CryoPNG from '../assets/elements/Element_Cryo.png';
import GeoPNG from '../assets/elements/Element_Geo.png';

function ElementalImagePicker(element: string) {
  switch (element) {
    case 'Pyro':
      return PyroPNG;
    case 'Hydro':
      return HydroPNG;
    case 'Dendro':
      return DendroPNG;
    case 'Electro':
      return ElectroPNG;
    case 'Anemo':
      return AnemoPNG;
    case 'Cryo':
      return CryoPNG;
    case 'Geo':
      return GeoPNG;
    default:
      return null;
  }
}

export default ElementalImagePicker;
