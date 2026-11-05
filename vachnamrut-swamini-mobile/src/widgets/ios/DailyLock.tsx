import { Text, VStack } from '@expo/ui/swift-ui';
import { containerBackground, font, widgetURL } from '@expo/ui/swift-ui/modifiers';
import { createWidget } from 'expo-widgets';
import { PlatformColor } from 'react-native';
import { approvedCatalog } from '../../content/demo';
import { LOCK_WIDGET_MAX_EXCERPT_LENGTH, widgetPropsFor } from '../shared/presentation';

export type DailyWidgetProps = { title: string; excerpt: string; reference: string; url: string };

const demoProps: DailyWidgetProps = {
  title: '[DEMO] Daily teaching',
  excerpt: '[DEMO TEXT — NOT SCRIPTURE]',
  reference: 'Demo Vachanamrut Reference',
  url: 'vachdaily://reading/demo-vachanamrut-1',
};

const initialProps = approvedCatalog[0] ? widgetPropsFor(approvedCatalog[0], 'both', LOCK_WIDGET_MAX_EXCERPT_LENGTH) : demoProps;

function DailyLockView(props: DailyWidgetProps) {
  'widget';
  return (
    <VStack modifiers={[containerBackground(PlatformColor('systemBackground'), 'widget'), widgetURL(props.url)]}>
      <Text modifiers={[font({ weight: 'bold', size: 13 })]}>{props.title}</Text>
      {props.excerpt ? <Text modifiers={[font({ size: 11 })]}>{props.excerpt}</Text> : null}
      <Text modifiers={[font({ size: 10 })]}>{props.reference}</Text>
    </VStack>
  );
}

export default createWidget('DailyLock', DailyLockView, initialProps);
