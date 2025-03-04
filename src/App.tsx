import { useForm } from "react-hook-form";
import { useEffect } from "react";

const regExp = {
  login: /^[a-zA-Z0-9]{3,16}$/,
  password: /^[a-zA-Z0-9]{6,16}$/,
};

function App() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setFocus("login");
  }, [setFocus]);

  const onSubmit = (data) => {
    console.log("Форма отправлена:", data);
  };



  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 border rounded-md shadow-md space-y-4">
      <div>
        <label className="block">Логин:</label>
        <input
          {...register("login", { required: "Логин обязателен", pattern: { value: regExp.login, message: "Логин должен содержать от 3 до 16 латинских букв или цифр" } })}
          className={`border p-2 w-full ${errors.login ? "border-red-500" : "border-gray-500"}`}
        />
        {errors.login && <p className="text-red-500 text-sm">{errors.login.message}</p>}
      </div>
      
      <div>
        <label className="block">Email:</label>
        <input
          type="email"
          {...register("email", {
            required: "Email обязателен",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Введите корректный email",
            },
          })}
          className={`border p-2 w-full ${errors.email ? "border-red-500" : "border-gray-500"}`}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      
      <div>
        <label className="block">Пароль:</label>
        <input
          type="password"
          {...register("password", {
            required: "Пароль обязателен",
            pattern: {
              value: regExp.password,
              message: "Пароль должен содержать от 6 до 16 латинских букв или цифр",
            },
          })}
          className={`border p-2 w-full ${errors.password ? "border-red-500" : "border-gray-500"}`}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>
      
      <div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("terms", { required: "Вы должны согласиться с условиями" })} />
          <span>Согласен с условиями</span>
        </label>
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}
      </div>
      
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Зарегистрироваться</button>
    </form>
  )
}

export default App

 



