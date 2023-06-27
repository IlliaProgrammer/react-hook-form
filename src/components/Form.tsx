import React, { FC } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { IOption, IShppingField } from '../models/models'
import ReactSelect from 'react-select'
import "../styles/Form.css"


export const options: IOption[] = [
	{
		value: 'ukraine',
		label: 'Ukraine',
	},
	{
		value: 'usa',
		label: 'USA',
	},
	{
		value: 'poland',
		label: 'Poland',
	},
]

export const getValue = (value: string) =>
	value ? options.find(option => option.value === value) : ''

const ShippingForm: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm<IShppingField>({
		mode: 'onChange',
	})

	const onSubmit: SubmitHandler<IShppingField> = data => {
		alert(`Hello ${data.name}`)
		reset()
	}

	return (
		<div>
			<h1>Enter your shipping info</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				
			>
				<div>
					<input
						{...register('name', {
							required: 'Name is require field!',
						})}
						placeholder='Name'
					/>
					{errors?.name && (
						<div style={{ color: 'red', marginBottom: 10 }}>
							{errors.name.message}
						</div>
					)}
				</div>
				<div>
					<input
						{...register('email', {
							required: 'Email is required field!',
							pattern: {
								value:
									/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
								message: 'Please enter valid email!',
							},
						})}
						placeholder='Email'
					/>
					{errors?.email && (
						<div style={{ color: 'red', marginBottom: 10 }}>
							{errors.email.message}
						</div>
					)}
				</div>

				<Controller
					control={control}
					name='address.country'
					rules={{
						required: 'Country is required!',
					}}
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<div>
							<ReactSelect
								placeholder='Countries'
								options={options}
								value={getValue(value)}
								onChange={newValue => onChange((newValue as IOption).value)}
							/>
							{error && (
								<div style={{ color: 'red', marginBottom: 10 }}>
									{error.message}
								</div>
							)}
						</div>
					)}
				/>

				<div style={{ marginTop: 15 }}>
					<input
						{...register('address.city', {
							required: 'City is required field!',
						})}
						placeholder='City'
					/>
					{errors?.address?.city && (
						<div style={{ color: 'red', marginBottom: 10 }}>
							{errors.address.city.message}
						</div>
					)}
				</div>

				<div>
					<input
						{...register('address.street', {
							required: 'Street is required field!',
						})}
						placeholder='Street'
					/>
					{errors?.address?.street && (
						<div style={{ color: 'red', marginBottom: 10 }}>
							{errors.address.street.message}
						</div>
					)}
				</div>

				<button>Send</button>
			</form>
		</div>
	)
}

export default ShippingForm