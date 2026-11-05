import { Text, VStack } from '@expo/ui/swift-ui';
import { containerBackground, font, widgetURL } from '@expo/ui/swift-ui/modifiers';
import { createWidget } from 'expo-widgets';
import { PlatformColor } from 'react-native';
import type { DailyWidgetProps } from './DailyLock';
import { approvedCatalog } from '../../content/demo';
import { widgetPropsFor } from '../shared/presentation';

const demoProps: DailyWidgetProps = {
  title: '[DEMO] Daily teaching',
  excerpt: '[DEMO TEXT — NOT SCRIPTURE]',
  reference: 'Demo Vachanamrut Reference',
  url: 'vachdaily://reading/demo-vachanamrut-1',
};

const initialProps = approvedCatalog[0] ? widgetPropsFor(approvedCatalog[0], 'both') : demoProps;

function DailyHomeView(props: DailyWidgetProps) {
  'widget';
  return (
    <VStack modifiers={[containerBackground(PlatformColor('systemBackground'), 'widget'), widgetURL(props.url)]}>
      <Text modifiers={[font({ weight: 'bold', size: 17 })]}>{props.title}</Text>
      {props.excerpt ? <Text modifiers={[font({ size: 15 })]}>{props.excerpt}</Text> : null}
      <Text modifiers={[font({ size: 12 })]}>{props.reference}</Text>
    </VStack>
  );
}

export default createWidget('DailyHome', DailyHomeView, initialProps);
