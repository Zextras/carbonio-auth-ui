import React from 'react';
import { Padding, Row, Text } from '@zextras/zapp-ui';

export default function Heading({ title }) {
	return (
		<>
			<Row
				padding={{ all: 'small' }}
				mainAlignment="baseline"
				crossAlignment="baseline"
				width="100%"
			>
				<Text size="large" weight="bold">
					{title}
				</Text>
			</Row>
			<Padding veritcal="small" />
		</>
	);
}