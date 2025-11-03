import { useRef, useState } from 'react';

import Button from '../../components/Button/Button';
import { FORM_ERROR_MESSAGES } from '../../shared/constants';
import { validatedFormSchema } from '../../shared/utils/validatedFormSchema';
import { useAppDispatch } from '../../store/hooks';
import { createCard } from '../../store/slices/cards-slice';

import styles from './CreateProducts.module.scss';

const INITIAL_FORM_DATA = {
  id: '',
  name: '',
  gender: '',
  species: '',
  status: '',
  location: '',
  lastLocation: '',
  file: '',
};

const CreateProduct = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<string>('');
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileName, setFileName] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    const data = {
      id: `${crypto.randomUUID()}c`,
      name: String(formData.get('name') || INITIAL_FORM_DATA.name),
      gender: String(formData.get('gender') || INITIAL_FORM_DATA.gender),
      species: String(formData.get('species') || INITIAL_FORM_DATA.species),
      status: String(formData.get('status') || INITIAL_FORM_DATA.status),
      location: String(formData.get('location') || INITIAL_FORM_DATA.location),
      lastLocation: String(
        formData.get('lastLocation') || INITIAL_FORM_DATA.lastLocation
      ),
      file: fileRef.current,
    };

    const result = validatedFormSchema.safeParse(data);

    if (!result.success) {
      const newErrors: Record<string, string> = {};

      result.error.issues.forEach((err) => {
        if (err.path.length > 0) {
          newErrors[String(err.path[0])] = err.message;
        }
      });
      setErrors(newErrors);

      return;
    }

    dispatch(createCard(result.data));
    resetForm();
    setIsSuccess(true);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.file) {
      setErrors((prev) => {
        const { file, ...rest } = prev;

        return rest;
      });
    }

    const file = e.target.files?.[0];

    if (!file) {
      setFileName('');
      fileRef.current = '';

      return;
    }

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = () => {
      fileRef.current = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setIsSuccess(false);
    const { name } = e.target;

    if (errors[name]) {
      setErrors((prev) => {
        const { [name]: _, ...rest } = prev;

        return rest;
      });
    }
  };

  const resetForm = () => {
    formRef.current?.reset();
    fileRef.current = '';
    setFileName('');
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <fieldset className={styles.fieldset}>
      <h2>Create Product</h2>
      <form className={styles.form} onSubmit={(e) => onSubmit(e)} ref={formRef}>
        <div className={styles.field_wrapper}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.field_wrapper}>
          <label htmlFor="gender">Gender</label>
          <select id="gender" name="gender" onChange={handleInputChange}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unknown">Other</option>
          </select>
          {errors.gender && (
            <p className={styles.error}>
              {FORM_ERROR_MESSAGES.gender.required}
            </p>
          )}
        </div>

        <div className={styles.field_wrapper}>
          <label htmlFor="status">Status</label>
          <select id="status" name="status" onChange={handleInputChange}>
            <option value="">Select status</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="Unknown">Unknown</option>
          </select>
          {errors.status && (
            <p className={styles.error}>
              {FORM_ERROR_MESSAGES.status.required}
            </p>
          )}
        </div>

        <div className={styles.field_wrapper}>
          <label htmlFor="species">Species</label>
          <input
            type="text"
            id="species"
            name="species"
            onChange={handleInputChange}
          />
          {errors.species && <p className={styles.error}>{errors.species}</p>}
        </div>

        <div className={styles.field_wrapper}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={handleInputChange}
          />
          {errors.location && <p className={styles.error}>{errors.location}</p>}
        </div>

        <div className={styles.field_wrapper}>
          <label htmlFor="lastLocation">Last known location</label>
          <input
            type="text"
            id="lastLocation"
            name="lastLocation"
            onChange={handleInputChange}
          />
          {errors.lastLocation && (
            <p className={styles.error}>{errors.lastLocation}</p>
          )}
        </div>

        <div className={styles.field_wrapper}>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            onChange={handleFileSelect}
            className={styles.hidden_input}
          />
          <label htmlFor="image" className={styles.custom_button}>
            Upload image
          </label>
          <span className={styles.file_name}>
            {fileName ? `Selected: ${fileName}` : 'No file chosen'}
          </span>

          {errors.file && <p className={styles.error}>{errors.file}</p>}
        </div>

        <div className={styles.buttons}>
          <Button text="Add" type="submit" />
          <Button text="Cancel" type="button" callback={resetForm} />
        </div>
        <div className={styles.form_message}>
          {isSuccess ? `Card added successfully` : ''}
        </div>
      </form>
    </fieldset>
  );
};

export default CreateProduct;
