import { 
  ChartPieIcon, 
  ArrowsRightLeftIcon, 
  ClockIcon, 
  UserIcon,
  WrenchScrewdriverIcon,
  TrophyIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../routes';
import Logo from '../Logo';
import type { NavigationItem } from '../../types';

const iconMap = {
  'chart-pie': ChartPieIcon,
  'arrow-right-left': ArrowsRightLeftIcon,
  'clock': ClockIcon,
  'user': UserIcon,
  'tool': WrenchScrewdriverIcon,
  'target': TrophyIcon,
  'trending-up': ChartBarIcon,
};

interface SidebarProps {
  navigation?: NavigationItem[];
  onNavigationChange?: (item: NavigationItem) => void;
}

export default function Sidebar({ navigation, onNavigationChange }: SidebarProps) {
  const location = useLocation();

  // If navigation prop is provided, use it; otherwise fall back to routes
  const navigationItems = navigation || routes.map(route => ({
    id: route.id,
    name: route.name,
    icon: route.icon,
    href: route.path,
    current: location.pathname === route.path
  }));

  return (
    <div className="flex h-screen flex-col bg-sidebar-bg text-white w-64">
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center mr-3">
            <Logo variant="white" width={24} height={26} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white">Manulife</h1>
            <p className="text-sm text-gray-300">Investment Management</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = navigation ? item.current : location.pathname === item.href;
          
          const handleClick = () => {
            if (onNavigationChange) {
              onNavigationChange(item);
            }
          };
          
          return (
            <Link
              key={item.id}
              to={item.href}
              onClick={handleClick}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-manulife-green text-white'
                  : 'text-gray-300 hover:bg-sidebar-hover hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-gray-700">
        <button className="w-full flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:bg-sidebar-hover hover:text-white rounded-lg transition-colors">
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
