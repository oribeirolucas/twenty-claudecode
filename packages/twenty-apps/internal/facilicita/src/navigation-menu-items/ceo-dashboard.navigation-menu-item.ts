import {
  defineNavigationMenuItem,
  NavigationMenuItemType,
} from 'twenty-sdk/define';
import { CEO_DASHBOARD_PAGE_LAYOUT_ID } from '../page-layouts/ceo-dashboard.page-layout';

export default defineNavigationMenuItem({
  universalIdentifier: 'f0847615-933a-43b5-afc7-b26094d5ca07',
  name: 'Dashboard do CEO',
  icon: 'IconChartBar',
  position: 2,
  type: NavigationMenuItemType.PAGE_LAYOUT,
  pageLayoutUniversalIdentifier: CEO_DASHBOARD_PAGE_LAYOUT_ID,
});
