export type Media = {
	id: number;
	documentId: string;
	name: string;
	alternativeText: string | null;
	caption: string | null;
	width: number;
	height: number;
	formats: {
		[key: string]: MediaFormat;
	},
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: string | null;
	provider: string;
	provider_metadata: string | null;
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
}
export type MediaFormat = {
	ext: string;
	url: string;
	hash: string;
	mime: string;
	name: string;
	path: string | null;
	size: number;
	width: number;
	height: number;
	sizeInBytes: number;
}

export type Data = {
	id: number;
	documentId: string;
	createAt: string;
	updatedAt: string;
	publishedAt: string;
	[key: string]: any;
}

export type Meta = {
	pagination: MetaPagination;
}

export type MetaPagination = {
	page: number;
	pageSize: number;
	pageCount: number;
	total: number;
}

export type StrapiResponse = {
	data: Data[];
	meta: Meta;
}

export type Project = {
	id: number;
	slug: string;
	title: string;
	description: string;
	job: string;
	type: string;
	media_url: string;
	date: string;
	genre: string;
	duration: number;
	production: string;
}