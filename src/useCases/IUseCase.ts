// uma interface de useCaseGenerica que recebe um inputDTO e outputDTO
// e tem um método execute que recebe um inputDTO e retorna um outputDTO

export interface IUseCase<InputDTO, OutputDTO> {
  execute(inputDTO: InputDTO): Promise<OutputDTO>;
}
