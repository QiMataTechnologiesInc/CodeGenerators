#include "string_generator.hpp"

#include <boost\algorithm\string.hpp>

using namespace qimata::codegenerators::common::generators;
using namespace qimata::codegenerators::common::models;
using namespace std;

string_generator::string_generator(const cpp_type_model& cpp_type_model) : cpp_type_model_(cpp_type_model)
{
}

string_generator::~string_generator()
{
}

string string_generator::get_class_declartion() const
{
	string class_declartion;
	class_declartion.reserve(1000);

	class_declartion += "#ifndef " + get_include_guard() + '\n';
	class_declartion += "#define " + get_include_guard() + '\n';
	class_declartion += '\n';

	class_declartion += get_namespace_and_class() + '\n';

	class_declartion += "#endif //" + get_include_guard();

	return class_declartion;
}

string string_generator::get_include_guard() const
{
	string include_guard;
	include_guard.reserve(100);

	for (auto name_space: cpp_type_model_.namespaces) //use a copy of namespace toupper it
	{
		boost::to_upper(name_space);
		include_guard += "__" + name_space;
	}

	auto class_name_temp = cpp_type_model_.class_name;
	boost::to_upper(class_name_temp);

	return include_guard += "__" + class_name_temp + "__HPP__";
}

string string_generator::get_namespace_and_class() const
{
	auto tab_count = 0;
	
	string namespace_and_class;
	namespace_and_class.reserve(1000);

	for(auto& name_space : cpp_type_model_.namespaces)
	{
		namespace_and_class += get_tabs(tab_count) + "namespace " + name_space + '\n' + get_tabs(tab_count) + '{' + '\n';
		tab_count++;
	}

	namespace_and_class += new_line_at_tab_count(tab_count, "class " + cpp_type_model_.class_name)
		+ new_line_at_tab_count(tab_count, "{")
		+ new_line_at_tab_count(tab_count + 1, "public:")
		+ new_line_at_tab_count(tab_count + 1, "protected:")
		+ new_line_at_tab_count(tab_count + 1, "private:")
		+ new_line_at_tab_count(tab_count, "};");

	for (size_t i = 0; i < cpp_type_model_.namespaces.size(); i++)
	{
		tab_count--;
		namespace_and_class += get_tabs(tab_count) + "}\n";
	}

	return namespace_and_class;
}

std::string string_generator::get_tabs(size_t tab_count) const
{
	string tabs;
	tabs.assign(tab_count, '\t');

	return tabs;
}

string string_generator::new_line_at_tab_count(size_t tab_count,string line) const
{
	return get_tabs(tab_count) + line + '\n';
}