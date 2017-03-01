import React, { Component, PropTypes } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import theme from '../../../../theme';

const ICON_VARIANT = {
	bottom: 'ios-arrow-up',
	top: 'ios-arrow-down',
};

const animateToValue = (val) => ({
	toValue: val,
	duration: 150,
});

export default class Preview extends Component {
	constructor (props) {
		super(props);

		this.state = {
			animValue: new Animated.Value(0),
		};
	}
	componentWillReceiveProps (nextProps) {
		if (!this.props.isActive && nextProps.isActive) {
			this.tada();
		}
	}

	tada () {
		const { animValue } = this.state;

		Animated.timing(animValue, animateToValue(1)).start(() => {
			Animated.timing(animValue, animateToValue(0)).start();
		});
	}
	render () {
		const {
			position,
			subtitle,
			title,
		} = this.props;
		const { animValue } = this.state;

		let baseStyles;

		if (position === 'bottom') {
			baseStyles = {
				bottom: -theme.nextup.height,
			};
		} else {
			baseStyles = {
				top: -theme.nextup.height,
			};
		}

		const icon = (
			<Animated.View style={{
				backgroundColor: 'transparent',
				transform: [{
					scale: animValue.interpolate({
						inputRange: [0, 1],
						outputRange: [1, 1.5],
					}),
				}],
			}}>
				<Icon
					color={theme.color.text}
					name={ICON_VARIANT[position]}
					size={20}
				/>
			</Animated.View>
		);

		return (
			<View style={[styles.base, baseStyles]}>
				{position === 'bottom' && icon}
				<Text style={styles.title} numberOfLines={1}>
					{title}
				</Text>
				<Text style={styles.subtitle}>
					{subtitle}
				</Text>
				{position === 'top' && icon}
			</View>
		);
	}
};

Preview.propTypes = {
	isActive: PropTypes.bool,
	position: PropTypes.oneOf(['bottom', 'top']),
	subtitle: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
	base: {
		alignItems: 'center',
		justifyContent: 'center',
		height: theme.nextup.height,
		paddingHorizontal: 60,
		position: 'absolute',
		left: 0,
		width: Dimensions.get('window').width,
	},
	title: {
		textAlign: 'center',
	},
	subtitle: {
		color: theme.color.gray60,
		textAlign: 'center',
	},
});