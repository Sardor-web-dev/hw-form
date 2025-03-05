import { useForm } from "react-hook-form";

const regExp = {
  name: /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/, 
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
  password: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, 
};

function App() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Форма отправлена:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 border rounded-md shadow-md space-y-4"
    >
      <div>
        <label className="block">Имя:</label>
        <input
          {...register("name", {
            required: "Имя обязательно",
            pattern: { value: regExp.name, message: "Некорректное имя (2-30 символов)" },
          })}
          className={`border p-2 w-full ${errors.name ? "border-red-500" : "border-gray-500"}`}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block">Email:</label>
        <input
          type="email"
          {...register("email", {
            required: "Email обязателен",
            pattern: { value: regExp.email, message: "Введите корректный email" },
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
              message: "Пароль должен содержать хотя бы 1 заглавную букву, 1 цифру и 1 спецсимвол (!@#$%^&*)",
            },
          })}
          className={`border p-2 w-full ${errors.password ? "border-red-500" : "border-gray-500"}`}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block">Повторите пароль:</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Повтор пароля обязателен",
            validate: (value) => value === getValues("password") || "Пароли не совпадают",
          })}
          className={`border p-2 w-full ${errors.confirmPassword ? "border-red-500" : "border-gray-500"}`}
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register("terms", { required: "Вы должны согласиться с условиями" })} />
          <span>Согласен с условиями</span>
        </label>
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms.message}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        отправить
      </button>
    </form>
  );
}

export default App;
