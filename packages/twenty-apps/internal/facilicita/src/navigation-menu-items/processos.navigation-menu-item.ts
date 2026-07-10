import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';
import { PROCESSO_UNIVERSAL_IDENTIFIER } from '../objects/processo.object';

export default defineNavigationMenuItem({
  universalIdentifier: 'a503e2a5-ef13-4485-a3f4-f6f280034569',
  position: 0,
  type: NavigationMenuItemType.OBJECT,
  targetObjectUniversalIdentifier: PROCESSO_UNIVERSAL_IDENTIFIER,
});
