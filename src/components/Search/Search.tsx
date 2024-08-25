import { useForm } from "react-hook-form"
import styles from "./Search.module.css"
import { Button, LabeledInput, LoadingButton } from "../../components"
import { IoSearchSharp } from "react-icons/io5"

interface Props {
  handleSearch: (value: string) => void
}

const Search = ({ handleSearch }: Props) => {
  const isLoading = false
  const { register, handleSubmit } = useForm<{ search: string }>({
    mode: "onChange",
    defaultValues: {
      search: "",
    },
  })

  const onSubmit = handleSubmit(async data => {
    handleSearch(data.search)
  })

  return (
    <div className={styles.search}>
      <form className={styles.form} onSubmit={onSubmit}>
        <LabeledInput
          name="search"
          wrapperStyle={{ marginBottom: "0px" }}
          labelStyle={{ display: "none" }}
          placeholder="Search"
          label="search"
          type="text"
          register={register}
        />
        {!isLoading ? (
          <Button
            disabled={isLoading}
            style={{ borderRadius: "50%", padding: "10px", marginLeft: "10px" }}
            type="submit"
          >
            <IoSearchSharp style={{ fontSize: "20px" }} />
          </Button>
        ) : (
          <LoadingButton style={{ width: "100%" }}>Loading...</LoadingButton>
        )}
      </form>
    </div>
  )
}

export default Search
