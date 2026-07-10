import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';
import { COBRANCA_UNIVERSAL_IDENTIFIER } from '../objects/cobranca.object';

export default defineNavigationMenuItem({
  universalIdentifier: 'c44345aa-4f8e-4ca6-96f1-69214e2ca07c',
  position: 1,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: COBRANCA_UNIVERSAL_IDENTIFIER,
});
