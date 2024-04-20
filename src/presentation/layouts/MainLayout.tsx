import { useNavigation } from '@react-navigation/native';
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MyIcon from '../components/ui/MyIcon';

interface Props {
	title: string;
	subTitle?: string;

	rightAction?: () => void;
	rightActionIcon?: string;

	children?: React.ReactNode;
}

const MainLayout = ({ title, subTitle, rightAction, rightActionIcon, children }: Props) => {
	const { top } = useSafeAreaInsets();
	const { goBack, canGoBack } = useNavigation();

	const RenderBackAction = () => <TopNavigationAction icon={<MyIcon name='arrow-back-outline' />} onPress={goBack} />;

	const RenderRightAction = () => {
		if (!rightAction || !rightActionIcon) return null;
		return <TopNavigationAction onPress={rightAction} icon={<MyIcon name={rightActionIcon} />} />;
	};

	return (
		<Layout style={{ paddingTop: top }}>
			<TopNavigation
				title={title}
				subtitle={subTitle}
				alignment='center'
				accessoryLeft={canGoBack() ? RenderBackAction : undefined}
				accessoryRight={() => <RenderRightAction />}
			/>
			<Divider />
			<Layout style={{ height: '100%' }}>{children}</Layout>
		</Layout>
	);
};

const styles = StyleSheet.create({});

export default MainLayout;
