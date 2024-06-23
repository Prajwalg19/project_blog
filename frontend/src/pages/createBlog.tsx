import {Alert, Button, TextInput} from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "../utils/axios"
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import {app} from '../../firebase';
import {useState} from 'react';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useNavigate} from 'react-router-dom';
import {AxiosError} from 'axios';

type FormData = {
    title: string;
    image: string;
    content: string;
}

export default function CreatePost() {
    const toolbarOptions = {
        toolbar: [
            [{font: []}],
            [{header: [1, 2, 3]}],
            ["bold", "italic", "underline", "strike"],
            [{color: []}, {background: []}],
            [{script: "sub"}, {script: "super"}],
            ["blockquote", "code-block"],
            [{list: "ordered"}, {list: "bullet"}],
        ],
    };

    const [file, setFile] = useState<File | null>(null);
    const [imageUploadProgress, setImageUploadProgress] = useState<string | null>(null);
    const [imageUploadError, setImageUploadError] = useState<string | null>(null);
    const [imageUploadSuccess, setImageUploadSuccess] = useState<true | false>(false);
    const [formData, setFormData] = useState<FormData>({
        title: '',
        image: '',
        content: ''
    });
    const [publishError, setPublishError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleUploadImage = async () => {
        if (!file) {
            setImageUploadError('Please select an image');
            return;
        }

        try {
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = `${new Date().getTime()}-${file.name}`;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                () => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setImageUploadSuccess(true);
                        setFormData((prev) => ({...prev, image: downloadURL}));
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadSuccess(false);
            setImageUploadProgress(null);
            console.error(error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!imageUploadSuccess) return setImageUploadError("Image required");
        try {
            const res = await axios.post('/blog/create', formData);
            setPublishError(null);
            navigate(`/blog/${res.data._id}`);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setPublishError(error.message);
                return;
            } else {
                setPublishError("Something went wrong");
                return;
            }
        }
    };

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>Write a Blog</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput
                        type='text'
                        placeholder='Title'
                        required
                        min={5}
                        id='title'
                        className='flex-1'
                        onChange={(e) => setFormData({...formData, title: e.target.value})}

                    />
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {e.target.files && setFile(e.target.files[0])}}
                        required
                    />
                    <Button
                        type='button'
                        gradientDuoTone='purpleToBlue'
                        size='sm'
                        outline
                        onClick={handleUploadImage}
                        disabled={!!imageUploadProgress}
                    >
                        {imageUploadProgress ? (
                            <div className='w-16 h-16'>
                                <CircularProgressbar
                                    value={Number(imageUploadProgress)}
                                    text={`${imageUploadProgress}%`}
                                />
                            </div>
                        ) : (
                            'Upload Image'
                        )}
                    </Button>
                </div>
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                {formData.image && (
                    <img
                        src={formData.image}
                        alt='upload'
                        className='w-full h-72 object-cover'
                    />
                )}
                <ReactQuill
                    theme='snow'
                    placeholder='Write something...'
                    className='h-72 mb-12'
                    onChange={(value) => setFormData({...formData, content: value})}
                    modules={toolbarOptions}
                />
                <Button type='submit' gradientDuoTone='purpleToPink'>
                    Publish
                </Button>
                {publishError && (
                    <Alert className='mt-5' color='failure'>
                        {publishError}
                    </Alert>
                )}
            </form>
        </div>
    );
}
