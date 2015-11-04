#include <iostream>
#include <generators/string_generator.hpp>

using namespace qimata::codegenerators::common;

void main(char * argz[],int argc)
{
	models::cpp_type_model cpp_type_model;
	cpp_type_model.namespaces.push_back("test");
	cpp_type_model.namespaces.push_back("test2");
	cpp_type_model.class_name = "class_name_test";

	generators::string_generator string_generator(cpp_type_model);
	std::cout << string_generator.get_class_declartion();

	system("PAUSE");
}
