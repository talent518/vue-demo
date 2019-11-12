import FilesImage from '@/components/FilesImage';
import FilesCss from '@/components/FilesCss';
import FilesJs from '@/components/FilesJs';
import FilesId from '@/components/FilesId';

export default [
	{path:'image', component:FilesImage},
	{path:'css', component:FilesCss},
	{path:'js', component:FilesJs},
	{path:':id', component:FilesId},
];
