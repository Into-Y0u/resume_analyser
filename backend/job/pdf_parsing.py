from pdfminer.high_level import extract_text


def parse_content(file_path : str):
    pdf_file = "resume/ALL_INSTITUTE_2024.pdf"
    text = extract_text(pdf_file=file_path)
    print(text)
    return text 